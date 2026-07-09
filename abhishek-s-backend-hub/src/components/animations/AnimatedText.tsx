import { motion } from "framer-motion";
import { Fragment } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
};

const AnimatedText = ({ text, className = "", once = true, delay = 0 }: AnimatedTextProps) => {
  const words = text.split(/(\s+)/);

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {word.trim() ? (
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: delay + index * 0.04 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ) : (
            word
          )}
        </Fragment>
      ))}
    </h1>
  );
};

export default AnimatedText;
