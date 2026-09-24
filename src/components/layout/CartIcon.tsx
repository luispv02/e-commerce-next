"use client";

import { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "motion/react";

interface CartIconProps {
  cartItemCount: number;
  badgeClassName: string;
  displayCount: React.ReactNode;
}

export const CartIcon = ({ cartItemCount, badgeClassName, displayCount }: CartIconProps) => {
  const previousCountRef = useRef(cartItemCount);
  const isFirstRender = useRef(true);

  const [shakeId, setShakeId] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousCountRef.current = cartItemCount;
      return;
    }

    if (cartItemCount > previousCountRef.current) {
      setShakeId((current) => current + 1);
    }

    previousCountRef.current = cartItemCount;
  }, [cartItemCount]);

  return (
    <motion.span
      key={shakeId}
      initial={{ rotate: 0 }}
      animate={shakeId === 0 ? { rotate: 0 } : { rotate: [0, -12, 10, -8, 6, 0] }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative block"
    >
      <FiShoppingCart className="size-5" />

      {cartItemCount > 0 && (
        <span className={badgeClassName}>
          {displayCount}
        </span>
      )}
    </motion.span>
  );
};