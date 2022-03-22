import * as React from "react";
import renderer from "react-test-renderer";

import { BoldText } from "../StyledText";

it(`renders correctly`, () => {
  const tree = renderer.create(<BoldText>Snapshot test!</BoldText>).toJSON();

  expect(tree).toMatchSnapshot();
});
