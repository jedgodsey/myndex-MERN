import React from 'react';
import { Box, DataChart, Card } from 'grommet';

const data = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2020-${((i % 12) + 1).toString().padStart(2, 0)}-01`,
    percent: Math.round(Math.abs(v * 100)),
  });
}

export const Guide = () => (
  <Card height="medium" width="large" background="light-1" elevation="medium">
    <Box margin="large" width={{ min: 'small', max: 'large' }}>
      <DataChart
        data={data}
        series={['date', 'percent']}
        chart={[
          { property: 'percent', thickness: 'xsmall', type: 'line' },
          {
            property: 'percent',
            thickness: 'medium',
            type: 'point',
            point: 'diamond',
          },
        ]}
        guide={{ x: { granularity: 'fine' }, y: { granularity: 'medium' } }}
        size={{ width: 'fill' }}
        detail
        animate
      />
    </Box>
  </Card>
);

Guide.story = {
  name: 'Animate',
  parameters: {
    chromatic: { disable: true },
  },
};

export default Guide;
