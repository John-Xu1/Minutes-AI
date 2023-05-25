import { Button } from "@chakra-ui/react";

export default function MinutesButton(props) {
  return (
    <Button
      width={props.width}
      height="75px"
      bgColor={props.bgColor}
      color={props.color}
      borderRadius={100}
      fontSize="2xl"
      boxShadow="2xl"
      mt={8}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
}
