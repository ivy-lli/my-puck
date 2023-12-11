import { FieldLabel, type Config, DropZone } from "@measured/puck";
import { Flex, FlexProps } from "./app/config/blocks/Flex";

type Props = {
  Flex: FlexProps;
  HeadingBlock: { title: string };
  Input: {placeholder: string, data: any};
  FieldLabel: {label: string};
};

export const config: Config<Props> = {
  categories: {
    'Layouting': {components:['Flex']},
    'Input': {components:['Input']}
  },
  components: {
    Flex,
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    Input: {
      fields: {
        placeholder: { type: "text"},
        data: {
          type: "external",
          fetchList: async () => {
            const items = await fetch('https://swapi.dev/api/people/').then(res => res.json());
            return items.results;
          }
        }
      },
      render: ({placeholder, data}) => (
        <input style={{width: 'calc(100% - 8px)'}} placeholder={placeholder} defaultValue={data?.name ?? ''} />
      )
    },
    FieldLabel: {
      fields: {
        label: { type: "text" },
      },
      defaultProps: {
        label: 'Empty label'
      },
      render: ({label}) => (
        <FieldLabel label={label}>
          <DropZone zone="field" />
        </FieldLabel>
      )
    }
  },
};

export default config;
