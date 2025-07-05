import { Link, useNavigate } from "react-router";
import Button from "../ui/Button";
import SignupLoginLayout from "../ui/SignupLoginLayout";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/Auth/Login/thunks";
import { getCartById } from "../store/CartStore/GetCartById/thunks";
import { setToken, setupInterceptors } from "../api/interceptors";
import toast from "react-hot-toast";
import { SuccesNotafication } from "../Toast-Notification/SuccesNotification";
import { IoBagCheck } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa6";

type FormValues = {
  userName: string;
  password: string;
};
const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  async function onSubmit(data: FormValues) {
    toast.loading("Loading");
    const resultAction = await dispatch(login(data));

    if (login.fulfilled.match(resultAction)) {
      toast.dismiss();
      toast.custom((t) => (
        <SuccesNotafication
          title="Login Successful"
          text="Welcome back!"
          icon={<FaUserCheck className="w-7 h-7 text-green-800" />}
          t={t}
        />
      ));
      const token = resultAction.payload.access_token;
      setToken(token);
      setupInterceptors(); // burada çağır, çünkü token artık var
      await dispatch(getCartById(resultAction.payload.userId));

      navigate("/");
    } else {
      console.error("Login failed", resultAction);
      toast.error("Error");
    }
  }
  return (
    <SignupLoginLayout>
      <h1 className="text-2xl font-bold">Log In</h1>

      <Form formVariation="sign" onSubmit={handleSubmit(onSubmit)}>
        <FormRow labelText="Username" errors={errors.userName?.message}>
          <Input
            type="text"
            id="userName"
            disabled={false}
            {...register("userName", { required: "This area is required!" })}
          />
        </FormRow>

        <FormRow labelText="Password" errors={errors.password?.message}>
          <Input
            type="password"
            id="password"
            disabled={false}
            {...register("password", { required: "This area is required!" })}
          />
        </FormRow>

        <Button>Sign Up</Button>

        <p className="font-normal">
          Dont have any account?{" "}
          <Link to={"/signup"} className="font-bold">
            Sign Up
          </Link>
        </p>
      </Form>
    </SignupLoginLayout>
  );
};

export default Login;
