import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { z } from "zod";

import { submitForm } from "@/action/submit-form";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Input } from "./ui/form-input";

const FormSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(2).max(50),
  last_name: z.string(),
  phone: z.string(),
  company: z.string(),
  position: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  handleReady: () => void;
  isReady: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const MyForm = ({ handleReady, isReady, open, setOpen }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("formToken");
    if (token) {
      handleReady();

      // If token exists, do something like redirect or show a message
      console.log("User has already submitted the form");
    }
  }, [handleReady]);

  const onSubmit = async (data: FormSchemaType) => {
    try {
      // Send form data to the API using a server action
      console.log("Submitting form", data);
      const res = await submitForm(data);

      if (res === 200) {
        // On successful submission, store a token in local storage
        localStorage.setItem("formToken", "your-generated-token");
        handleReady();
        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogOverlay className="bg-black/60" />
      <DialogPrimitive.Content
        onPointerDownOutside={() => {
          setOpen(false);
        }}
        className=" bg-white p-5 w-[50vw] fixed left-[50%] top-[50%] z-50  grid  max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 overflow-hidden rounded-2xl bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
      >
        <DialogHeader>
          <DialogTitle>Form</DialogTitle>

          <DialogDescription> </DialogDescription>

        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="First Name"
            type="text"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <Input
            label="Last Name"
            type="text"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
          <Input
            label="Phone"
            type="text"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Company"
            type="text"
            error={errors.company?.message}
            {...register("company")}
          />
          <Input
            label="Position"
            type="text"
            error={errors.position?.message}
            {...register("position")}
          />
          <Button type="submit" disabled={!isReady}>
            {isReady ? "Check it out!" : "Please wait..."}
          </Button>
        </form>
        <DialogClose onClick={() => setOpen(false)} />
      </DialogPrimitive.Content>
    </Dialog>
  );
};

export default MyForm;
