import Image from "next/image";
import WorkflowEditor from "./components/WorkflowEditor";

export default function Home() {
  return (
    <div className="w-full h-full">
      <WorkflowEditor />
    </div>
  );
}
