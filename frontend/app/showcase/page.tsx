import {
Button,
Input,
Modal,
Toast,
Loader,
} from "@/components/ui";
export default function Showcase() {
  return (
    <main
      className="
      p-10
      flex
      flex-col
      gap-10
      "
    >
      <h1
        className="
        text-5xl
        font-bold
        "
      >
        UI Component Showcase
      </h1>
      <div>
        <h2>Button</h2>
        <Button
          label="Explore"
        />
      </div>
      <div>
        <h2>Input</h2>
        <Input
          placeholder="Enter email"
        />
      </div>
      <div>
        <h2>Modal</h2>
        <Modal
          title="Sample Modal"
        />
      </div>
      <div>
        <h2>Toast</h2>
        <Toast
          message="Success"
        />
      </div>
      <div>
        <h2>Loader</h2>
        <Loader />
      </div>
    </main>
  );
}