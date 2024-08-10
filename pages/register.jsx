"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/formComponent";
import React, { useState, useEffect } from "react";
import FormFieldComponent from "../components/ui/FormField";
import DatePicker from "../components/ui/datePick";
import CountryPicker from "../components/ui/countryPick";
import InputFile from "@/components/ui/uploadFile";
import { useAuth } from "@/contexts/authentication";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import { checkUniqueUser } from "../lib/checkUniqueUser";
import { checkUniqueProfile } from "../lib/checkUniqueProfile";
import LoadingForm from "../components/ui/LoadingForm";

const minAge = 18;
const registerSchema = z.object({
  fullName: z.string().min(2),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .refine(
      async (username) => {
        return await checkUniqueUser("username", username);
      },
      { message: "username already exists" }
    ),
  password: z
    .string()
    .min(12, { message: "Password must be at least 12 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .refine(
      async (email) => {
        return await checkUniqueUser("email", email);
      },
      { message: "username already exists" }
    ),
  idNumber: z
    .string()
    .min(13, { message: "ID Number must be at least 13 digits." })
    .refine(
      async (idNumber) => {
        return await checkUniqueProfile("id_number", idNumber);
      },
      { message: "ID Number already exists" }
    ),
  dateBirth: z
    .date({
      message: "A date of birth is required.",
    })
    .refine(
      (date) => {
        const ageCalculated = Date.now() - date.getTime();
        const ageDate = new Date(ageCalculated);
        return Math.abs(ageDate.getUTCFullYear() - 1970) >= minAge;
      },
      { message: `You must be at least ${minAge} years old.` }
    ),
  country: z.string().nonempty({ message: "Please select a country." }),
  profilepic: z.custom((file) => file instanceof File, {
    message: "Profile Picture is required.",
  }),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      email: "",
      idNumber: "",
      dateBirth: "",
      country: "",
      profilepic: {},
    },
    mode: "all",
  });

  const { register } = useAuth();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("email", data.email);
      formData.append("full_name", data.fullName);
      formData.append("id_number", data.idNumber);
      formData.append("date_of_birth", data.dateBirth);
      formData.append("country", data.country);
      formData.append("profile_picture", data.profilepic);

      setIsLoading(true);
      await register(formData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="w-full min-h-[93vh] h-[93vh] inset-0 bg-cover bg-no-repeat bg-center bg-[url('../public/img/bg-register_page.jpg')] flex flex-col justify-start md:justify-center">
        <div className="w-full h-full md:h-[90%] flex justify-center items-center  bg-gradient-to-b from-[#00000099] to-transparent ">
          <div className="w-full h-full md:mt-14 md:mb-20 p-[5%] md:p-14 m-0 md:w-[45%] bg-[#F7F7FB] pt-10 md:rounded-lg">
            <div className="size-full flex flex-col justify-start gap-5  font-body ">
              <h1 className="text-7xl font-serif text-[#2F3E35] font-medium tracking-tighter">
                Register
              </h1>
              <h2 className="text-xl pt-10 pb-5 font-semibold tracking-tighter text-[#9AA1B9]">
                Basic Information
              </h2>

              {isLoading ? (
                <LoadingForm numberOfFields={5} />
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="text-base font-normal gap-3 md:grid md:grid-cols-2 "
                  >
                    <div className="md:col-span-2">
                      <FormFieldComponent
                        control={form.control}
                        name="fullName"
                        label="Full Name"
                        type="text"
                        placeholder="Enter your name and last name"
                      />
                    </div>

                    <FormFieldComponent
                      control={form.control}
                      name="username"
                      label="Username"
                      type="text"
                      placeholder="Enter your username"
                    />
                    <FormFieldComponent
                      control={form.control}
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <FormFieldComponent
                      control={form.control}
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <FormFieldComponent
                      control={form.control}
                      name="idNumber"
                      label="ID Number"
                      type="text"
                      placeholder="Enter your ID number"
                    />
                    <DatePicker
                      control={form.control}
                      name="dateBirth"
                      label="Date of Birth"
                      placeholder="Enter your date of birth"
                    />
                    <CountryPicker
                      control={form.control}
                      name="country"
                      label="Country"
                      placeholder="Select your country"
                    />
                    <div className="col-span-2 border-b border-[#E4E6ED]"></div>
                    <div className="col-span-2">
                      <InputFile
                        control={form.control}
                        name="profilepic"
                        label="Upload  Picture"
                        id="profilepic"
                        type="file"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-5 bg-[#C14817] w-full col-span-full md:col-span-1"
                    >
                      Register
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}