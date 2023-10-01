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
      <Img
        src="https://images.pexels.com/photos/4558572/pexels-photo-4558572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Email banner"
        width={100}
        height={66}
      />
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
