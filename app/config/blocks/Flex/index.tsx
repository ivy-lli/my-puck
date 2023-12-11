import React from "react";
import styles from "./styles.module.css";
import { ComponentConfig, DropZone } from "@measured/puck";
import getClassNameFactory from "../../../../lib/get-class-name-factory";
import { Section } from "../../components/Section";

const getClassName = getClassNameFactory("Flex", styles);

export type FlexProps = {
  items: { minItemWidth?: number }[];
  minItemWidth: number;
  grid: number;
};

export const Flex: ComponentConfig<FlexProps> = {
  fields: {
    items: {
      type: "array",
      arrayFields: {
        minItemWidth: {
          label: "Minimum Item Width",
          type: "number",
        },
      },
      getItemSummary: (_, id) => `Item ${id + 1}`,
    },
    minItemWidth: {
      label: "Minimum Item Width",
      type: "number",
    },
    grid: {
      label: "Use grid",
      type: "number"
    }
  },
  defaultProps: {
    items: [{}, {}],
    minItemWidth: 356,
    grid: 2
  },
  render: ({ items, minItemWidth, grid }) => {
    return (
      <Section>
        <div className={getClassName()}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={getClassName("item")}
              style={{ minWidth: item.minItemWidth/* || minItemWidth*/, width: `${12 / grid * 8}%` }}
            >
              <DropZone zone={`item-${idx}`} />
            </div>
          ))}
        </div>
      </Section>
    );
  },
};