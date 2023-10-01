import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import * as React from "react";

export default function ForgotPasswordEmail({ params }) {
  console.log(
    "🚀 ~ file: ForgotPasswordEmail.js:9 ~ ForgotPasswordEmail ~ params:",
    params
  );
  const { name, url } = params;
  return (
    <Html>
      <Img
        src="https://images.pexels.com/photos/4558572/pexels-photo-4558572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Email banner"
        width={100}
        height={66}
      />
      <Heading as="h2">Hello {name}</Heading>
      <Text>
        We recieved password reset request. If its not you please ignore it.
      </Text>
      <Button
        pX={20}
        pY={12}
        href={url}
        style={{ background: "#000", color: "#fff" }}
      >
        Click me
      </Button>
      <Heading as="h3">Regards</Heading>
      <Text>Muhammad Shahid</Text>
    </Html>
  );
}
