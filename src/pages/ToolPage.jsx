import IdeaFinder from "./tools/IdeaFinder.jsx";
import MarketFit from "./tools/MarketFit.jsx";
import PricingCalculator from "./tools/PricingCalculator.jsx";
import RevenueSimulator from "./tools/RevenueSimulator.jsx";
import RoadmapBuilder from "./tools/RoadmapBuilder.jsx";
import CahierDeCharge from "./tools/CahierDeCharge.jsx";
import BusinessModel from "./tools/BusinessModel.jsx";
import MarketingPlan from "./tools/MarketingPlan.jsx";
import HealthChecker from "./tools/HealthChecker.jsx";
import HostingAdvisor from "./tools/HostingAdvisor.jsx";
import NotFound from "./NotFound.jsx";

const TOOL_COMPONENTS = {
  "idea-finder": IdeaFinder,
  "market-fit": MarketFit,
  "pricing-calculator": PricingCalculator,
  "revenue-simulator": RevenueSimulator,
  "roadmap-builder": RoadmapBuilder,
  "cahier-de-charge": CahierDeCharge,
  "business-model": BusinessModel,
  "marketing-plan": MarketingPlan,
  "health-checker": HealthChecker,
  "hosting-advisor": HostingAdvisor,
};

export default function ToolPage({ slug, navigate }) {
  const Component = TOOL_COMPONENTS[slug];
  if (!Component) return <NotFound navigate={navigate} />;
  return <Component navigate={navigate} />;
}
