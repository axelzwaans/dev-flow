import React from "react";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const hotQuestions = [
  { id: "1", title: "How do I use express as a custom server in NextJS?" },
  {
    id: "2",
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  { id: "3", title: "How can an airconditioning machine exist?" },
  { id: "4", title: "Interrogated every time crossing UK Border as citizen" },
  {
    id: "5",
    title: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const popularTags = [
  { _id: "1", name: "javascript", totalQuestions: 5 },
  { _id: "2", name: "react", totalQuestions: 7 },
  { _id: "3", name: "next", totalQuestions: 5 },
  { _id: "4", name: "vue", totalQuestions: 4 },
  { _id: "5", name: "redux", totalQuestions: 10 },
];

const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px] custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question.id}`}
              key={question.id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron-right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
