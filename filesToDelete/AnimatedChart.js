import React from 'react';
import { Card, Box, Chart, Heading } from 'grommet';

const values = [{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }, { value: [40, 20] }, { value: [50, 30] }, { value: [60, 15] }, { value: [70, 20] }, { value: [80, 30] }, { value: [120, 15] }];

export const AnimatedChart = () => (
  <Card height="medium" width="large" background="light-1" elevation="medium">
    <Box direction="row-responsive" wrap pad="large">
      <Box key='line' margin="medium">
        <Heading size="small" textAlign="center">
          Salesforce, Inc. (CRM)
        </Heading>
        <Chart type='line' values={values} animate />
      </Box>
    </Box>
  </Card>
);

AnimatedChart.story = {
  name: 'Animate',
  parameters: {
    chromatic: { disable: true },
  },
};

export default AnimatedChart;
