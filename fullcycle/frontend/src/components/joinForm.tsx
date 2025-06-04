import React from "react";
import { Form } from "react-router-dom";
export interface JoinFormProps {
	onSubmit?(e: { email: string; password: string }): void;
}

export const JoinForm: React.FC<JoinFormProps> = (props) => {
	return (
		<Container>
      <Title>회원가입</Title>
      <Form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== passwordConfirm) {
          }
            props.onSubmit?.({ email, password });
            
            }
          }
      >

			<InputContainer>
			</InputContainer>
			
		</Container>
  )
}