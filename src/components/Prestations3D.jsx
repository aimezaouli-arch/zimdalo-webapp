import { useEffect, useRef, useState } from "react";

const SERVICES = [
  { label: "Construire", angle: 0 },
  { label: "Digitaliser", angle: 72 },
  { label: "Étendre", angle: 144 },
  { label: "Vendre", angle: 216 },
  { label: "Se former", angle: 288 },
];

export default function Prestations3D() {
  const stageRef = useRef(null);
  const labelRefs = useRef([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let renderer, scene, camera, group, frameId;
    let disposed = false;
    let cleanupFn = () => {};
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;
        cleanupFn = initScene(THREE);
      } catch (e) {
        if (!disposed) setFailed(true);
      }
    })();

    function initScene(THREE) {
      const w = stage.clientWidth || 800;
      const h = stage.clientHeight || 420;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.set(0, 0, 8.5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      stage.appendChild(renderer.domElement);

      group = new THREE.Group();
      scene.add(group);

      const center = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.55, 1),
        new THREE.MeshBasicMaterial({ color: 0xf2a73b, wireframe: true })
      );
      group.add(center);

      const radius = 3.1;
      const nodes = [];

      SERVICES.forEach((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad * 1.4) * 0.9;
        const z = Math.sin(rad) * radius;

        const node = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.26, 0),
          new THREE.MeshBasicMaterial({ color: 0x4cc9e8, wireframe: true })
        );
        node.position.set(x, y, z);
        group.add(node);

        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          node.position.clone(),
        ]);
        const mat = new THREE.LineBasicMaterial({ color: 0x4cc9e8, transparent: true, opacity: 0.35 });
        group.add(new THREE.Line(geo, mat));

        nodes.push(node);
      });

      function updateLabels() {
        nodes.forEach((node, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          const v = node.position.clone();
          group.localToWorld(v);
          v.project(camera);
          const x = (v.x * 0.5 + 0.5) * stage.clientWidth;
          const y = (-v.y * 0.5 + 0.5) * stage.clientHeight;
          el.style.left = x + "px";
          el.style.top = y + "px";
          el.style.opacity = v.z < 1 ? "1" : "0";
        });
      }

      let frame = 0;
      function animate() {
        frameId = requestAnimationFrame(animate);
        if (disposed) return;
        frame++;
        if (!reduceMotion) {
          group.rotation.y += 0.0035;
          group.rotation.x = Math.sin(frame * 0.004) * 0.15;
        }
        renderer.render(scene, camera);
        updateLabels();
      }
      animate();

      const onResize = () => {
        const w2 = stage.clientWidth,
          h2 = stage.clientHeight;
        if (!w2 || !h2) return;
        camera.aspect = w2 / h2;
        camera.updateProjectionMatrix();
        renderer.setSize(w2, h2);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) obj.material.dispose();
        });
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode === stage) {
          stage.removeChild(renderer.domElement);
        }
      };
    }

    return () => {
      disposed = true;
      cleanupFn();
    };
  }, []);

  if (failed) {
    return (
      <div className="three-stage" ref={stageRef}>
        <p className="three-fallback">
          Animation 3D non disponible sur cet appareil — les cinq prestations restent accessibles dans
          le menu.
        </p>
      </div>
    );
  }

  return (
    <div className="three-stage" ref={stageRef}>
      {SERVICES.map((s, i) => (
        <div
          key={s.label}
          className="three-label"
          ref={(el) => (labelRefs.current[i] = el)}
        >
          {s.label}
        </div>
      ))}
    </div>
  );
}
