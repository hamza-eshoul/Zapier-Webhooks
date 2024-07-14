import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BeatLoader } from "react-spinners";

interface FormData {
  full_name: string;
  email: string;
  lesson_date: string;
  topic_of_lesson: string;
  lesson_objectives: string;
  student_engagement_level: string;
  observations: string;
}

const HomepageForm = () => {
  // local state
  const [isLoading, setIsLoading] = useState(false);

  // Library hooks
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FormData>();

  // functions
  const handleZapierWebhookRequest = async (data: FormData) => {
    const formattedData = {
      ...data,
      lesson_objectives: data.lesson_objectives[0],
    };

    const zapier_webhook_url =
      "https://hooks.zapier.com/hooks/catch/19449540/22bzko3/";

    try {
      const response = await fetch(zapier_webhook_url, {
        method: "POST",
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.success(
          "The form was submitted successfully! Ed Pulse thanks you for taking the time to fill it out."
        );
        reset(); // Assuming reset is a function to clear form data
      } else {
        throw new Error(
          "We encountered an error while submitting the form. Please try again later."
        );
      }
    } catch (error) {
      console.error("ERROR", error);
      toast.error(
        "We encountered an error while submitting the form. Please try again later."
      );
    } finally {
      setIsLoading(false); // Assuming you're managing loading state with setIsLoading
    }
  };

  const validateInputFields = (data: FormData) => {
    for (const [key, value] of Object.entries(data)) {
      if (value == "") {
        toast.error(`The field ${key.replace(/_/g, " ")} is empty!`);
        setIsLoading(false);
        return false;
      }
    }

    return true;
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    setTimeout(() => {
      const areInputsValid = validateInputFields(data);

      if (!areInputsValid) return;

      handleZapierWebhookRequest(data);
    }, 2000);
  };

  const lessonObjectivesValue = watch("lesson_objectives");

  const handleCheckboxChange = (value: "yes" | "no") => {
    setValue("lesson_objectives", value);
  };

  return (
    <section className="bg-white rounded-lg shadow-xl px-10 py-7 flex items-center justify-center w-[32rem]">
      <form
        className="flex flex-col gap-4 items-center w-[22rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-medium font-mono text-center text-blue-900">
          Tutoring Review Form
        </h1>

        <div className="flex flex-col items-center gap-1 w-full">
          <label>Full Name :</label>
          <input
            type="text"
            {...register("full_name")}
            placeholder="Enter your full name"
          />
        </div>

        <div className="flex flex-col items-center gap-1 w-full">
          <label>Email :</label>
          <input
            type="text"
            {...register("email")}
            placeholder="Enter your email address"
          />
        </div>

        <div className="flex flex-col items-center gap-1 w-full">
          <label>Lesson Date :</label>
          <input type="date" {...register("lesson_date")} />
        </div>

        <div className="flex flex-col items-center gap-1 w-full">
          <label>Topic of Lesson :</label>
          <select {...register("topic_of_lesson")}>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>English</option>
          </select>
        </div>

        <div className="flex flex-col items-center gap-1 w-full">
          <label>Lesson Objectives Achieved :</label>

          <div className="flex gap-4">
            <div className="flex gap-2.5 items-center">
              <label>Yes</label>
              <input
                type="checkbox"
                {...register("lesson_objectives")}
                value="yes"
                checked={lessonObjectivesValue === "yes"}
                onChange={() => handleCheckboxChange("yes")}
              />
            </div>
            <div className="flex gap-2.5 items-center">
              <label>No</label>
              <input
                type="checkbox"
                {...register("lesson_objectives")}
                value="no"
                checked={lessonObjectivesValue === "no"}
                onChange={() => handleCheckboxChange("no")}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 w-full">
          <label>Student Engagement Level :</label>
          <select {...register("student_engagement_level")}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div className="flex flex-col items-center gap-1 w-full">
          <label>Observations :</label>
          <textarea {...register("observations")} />
        </div>

        <button
          type="submit"
          className="bg-blue-700 font-mono text-white rounded-md py-2 px-10 hover:opacity-80 transition duration-300"
          disabled={isLoading}
        >
          {isLoading && <BeatLoader color="white" size={10} />}
          {!isLoading && "Submit"}
        </button>
      </form>
    </section>
  );
};

export default HomepageForm;
