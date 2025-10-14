import React from "react";
import DefaultLayout from "../../Layouts/DefaultLayout/DefaultLayout";
import Auth from "../../Auth/Auth";

export default function AuthPage() {
  return (
    <>
      <DefaultLayout>
        <Auth />
      </DefaultLayout>
    </>
  );
}
