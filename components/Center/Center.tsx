import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/outline";
import shuffle from "lodash.shuffle";
interface props {}

const colors = [
  "from-indigo-500",
  "from-green-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
const Center: FC<props> = () => {
  const { data: session } = useSession();
  const [color, setcolor] = useState<null | string>(null);

  useEffect(() => {
    const selectedColor = shuffle(colors).pop() as string;
    setcolor(selectedColor);
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        {session?.user?.image && (
          <div
            className="bg-black space-x-3 opacity-90 hover:opacity-80 
        cursor-pointer rounded-full p-1 pr-2 bg-red-300 flex items-center"
          >
            <Image
              width={40}
              height={40}
              src={session?.user?.image as string}
              alt="user profile image spotify"
              className="rounded-full"
            />

            <h2>{session?.user?.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        )}
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black 
        ${color} h-80 text-white p-8`}
      >
        {session?.user?.image && (
          <Image
            width={40}
            height={40}
            src={session?.user?.image as string}
            alt="user profile image spotify"
            className="rounded-full"
          />
        )}
      </section>
    </div>
  );
};

export default Center;
