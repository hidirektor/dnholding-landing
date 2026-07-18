import BrochureViewer from "@/components/brochure/BrochureViewer";

export const metadata = {
  title: "DN Holding - Broşür",
  description: "DN Holding kurumsal broşürü.",
};

export default function BrochurePage() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", display: "flex" }}>
      <BrochureViewer isPage={true} />
    </div>
  );
}
