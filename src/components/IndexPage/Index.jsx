import React from "react";
import DefaultLayout from "@layouts/DefaultLayout/DefaultLayout";
import CarCard from "@uiComponents/CarCard/CarCard";

import { CARS } from "../Libs/Cars";

export default function Index() {
  return (
    <>
      <DefaultLayout cars={CARS}>
        {CARS.map((element) => (
          <CarCard
            key={element.id}
            dataPath={element.dataImg}
            model={element.modelName}
            age={element.modelAge}
            text={element.text}
            price={element.price}
            description={element.description}
            specifications={element.specifications}
            category={element.category}
            feature={element.feature}
            sign={element.sign}
            location={element.location}
          />
        ))}
      </DefaultLayout>
    </>
  );
}
