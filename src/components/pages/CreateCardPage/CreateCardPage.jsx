import React from "react";
import CreateCard from "../../CreateCard/CreateCard";
import CreateCardLayout from "../../Layouts/CreateCardLayout/CreateCardLayout";
import CreateCardNew from "../../CreateCardNew/CreateCardNew";

export default function CreateCardPage() {
  return (
    <CreateCardLayout>
      <CreateCardNew />
    </CreateCardLayout>
  );
}
