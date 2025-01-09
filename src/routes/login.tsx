import { LoginFormData, loginSchema } from "@/schemas/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { AuthProvider } from "@/contexts/auth-context";

function Login() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function loginWithGoogle() {
    try {
      await signInWithGoogle();
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  const onSubmit = (values: LoginFormData) => {
    console.log(values);
  };

  return (
    <AuthProvider>
      <Form {...form}>
        <h1 className="text-center text-6xl my-10">M.😁.🥲.D</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-[338px] mx-auto mt-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="user@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    type="password"
                    placeholder="*********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <Button
              className="w-full font-bold"
              type="submit"
            >
              Login
            </Button>
            <p className="w-full text-center text-muted-foreground">or</p>
            <Button
              type="button"
              className="w-full"
              variant={"outline"}
              onClick={loginWithGoogle}
            >
              Login with Google
            </Button>
          </div>
        </form>
      </Form>
    </AuthProvider>
  );
}

export default Login;
