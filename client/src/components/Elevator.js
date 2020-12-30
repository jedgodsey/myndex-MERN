import React from 'react';
import { Card, CardFooter, CardBody, Heading } from 'grommet';

const Elevator = () => {
  return (
      <Card height="817px" width="medium" background="light-1" elevation="medium">
        <CardBody pad="medium">
          <Heading level='2' margin='medium'>Your Markets</Heading>
          <Heading level='4' margin='medium'>Your Actionable Intelligence</Heading>
          <p>MyNdex gives you the power to devine securities information as you see fit. For as long as public stock ownership has been around, touts, market-makers and other assorted carnival barkers have dictated to you the sectors and indices you ar e supposed to care about. Naturally, if these rainmakers truly knew what market information was truly important, they wouldn't be telling you... They'd be trading on it and getting rich themselves</p>
          <p>With MyNdex, you can create your own indices and your own benchmarks to cut through the clutter and BS.  You can take charge of the way you see the markets and change the way you see investing forever.</p>
          <p>Click above to login with Google and make your first custom index.</p>
        </CardBody>
        <CardFooter pad={{horizontal: "small"}} background="light-2">   
        </CardFooter>
      </Card>
  )
}

export default Elevator;
