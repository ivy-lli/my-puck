import { FieldLabel, type Config, DropZone } from "@measured/puck";
import { Flex, FlexProps } from "./app/config/blocks/Flex";
import { Section } from "./app/config/components/Section";

type Props = {
  Flex: FlexProps;
  Text: { text: string };
  Input: {label: string, placeholder: string, data: any};
  FieldLabel: {label: string};
};

export const config: Config<Props> = {
  categories: {
    'Layouting': {components:['Flex']},
    'Input': {components:['Input']}
  },
  components: {
    Flex,
    Text: {
      fields: {
        text: { type: "textarea" },
      },
      defaultProps: {
        text: "This is an Axon Ivy Dialog",
      },
      render: ({ text }) => (
        <Section>
          <p>{text}</p>
        </Section>
      ),
    },
    Input: {
      fields: {
        label: {type: "text"},
        placeholder: { type: "text"},
        data: {
          type: "external",
          fetchList: async () => {
            const items = await fetch('https://swapi.dev/api/people/').then(res => res.json());
            return items.results;
          }
        }
      },
      render: ({label, placeholder, data}) => (
        <label>
          <span>{label}</span>
          <input style={{width: 'calc(100% - 8px)'}} placeholder={placeholder} defaultValue={data?.name ?? ''} />
        </label>
      )
    },
  },
};

export default config;
