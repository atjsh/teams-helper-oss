import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { isEmail } from "validator";
import {
  createVerificationCode,
  getSessionWithVerificationCode
} from "../api/fetch";

type Email = string;
type VerifyingEmail = Email | null;

interface GetSessionWithVerificationCodeFormValues {
  verificationCode: string;
}

function GetSessionWithVerificationCodeForm({ email }: { email: Email }) {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors, isSubmitting, isValid }
  } = useForm<GetSessionWithVerificationCodeFormValues>({
    mode: "onBlur",
    reValidateMode: "onSubmit"
  });

  if (isValid) {
    return <Navigate to={"/"} />;
  }

  return (
    <form
      onSubmit={handleSubmit(
        async (formValues: GetSessionWithVerificationCodeFormValues) => {
          try {
            await getSessionWithVerificationCode({
              email: email,
              verificationCode: formValues.verificationCode
            });

            return true;
          } catch (error) {
            setError("root", {
              type: "onChange",
              message: "로그인에 실패했습니다. 인증 코드를 확인해주세요."
            });
          }
        }
      )}
    >
      {errors.root && <p>{errors.root.message}</p>}

      {errors.verificationCode && <p>{errors.verificationCode.message}</p>}
      <input
        type="text"
        placeholder="인증 코드"
        disabled={isSubmitting}
        {...register("verificationCode", {
          required: true
        })}
      />

      <p>
        <b>{email}</b>로 발송된 인증 코드를 입력해주세요
      </p>

      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}

interface LoginWithEmailFormValues {
  email: string;
}

function CreateVerificationCodeForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<LoginWithEmailFormValues>({
    mode: "onBlur",
    reValidateMode: "onSubmit"
  });

  const [verifyingEmail, setVerifyingEmail] = useState<VerifyingEmail>(null);

  function clearVerifyingEmail() {
    setVerifyingEmail(null);
    reset();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(async (formValues: LoginWithEmailFormValues) => {
          try {
            await createVerificationCode({ email: formValues.email });

            setVerifyingEmail(formValues.email);

            return true;
          } catch (error) {
            setError("root", {
              type: "onChange",
              message: "인증 코드 발송에 실패했습니다. "
            });
          }
        })}
      >
        {errors.root && <p>{errors.root.message}</p>}

        {isSubmitSuccessful && <p>✅ 이메일 주소로 인증 코드를 발송했습니다</p>}
        {isSubmitting && <p>로딩중...</p>}

        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="email">이메일 주소</label>
        <input
          id="email"
          type="email"
          placeholder="user@example.com"
          disabled={isSubmitSuccessful}
          {...register("email", {
            required: true,
            validate: (v) =>
              isEmail(v) ? true : "이메일 형식에 맞는 주소를 입력해주세요"
          })}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitSuccessful ? "인증 코드 재전송" : "인증 코드 전송"}
        </button>
        {verifyingEmail && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={clearVerifyingEmail}
          >
            이메일 주소 변경
          </button>
        )}
      </form>
      {verifyingEmail && (
        <GetSessionWithVerificationCodeForm email={verifyingEmail} />
      )}
    </>
  );
}

export function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <CreateVerificationCodeForm />
    </div>
  );
}
