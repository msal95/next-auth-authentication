import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import * as React from "react";

export default function ForgotPasswordEmail(props) {
  const { name, url } = props;
  return (
    <Html>
      <Heading as="h2">Hello {name}</Heading>
      <Button
        pX={20}
        pY={12}
        href="https://example.com"
        style={{ background: "#000", color: "#fff" }}
      >
        Click me
      </Button>
    </Html>
  );
}
