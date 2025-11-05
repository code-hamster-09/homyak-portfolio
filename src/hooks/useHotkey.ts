// hooks/useHotkey.ts

import { useCallback, useEffect } from "react";

// Тип для функций обратного вызова
type Callback = () => void;

/**
 * Хук для прослушивания глобальных горячих клавиш.
 * * @param keyCombination - Сочетание клавиш, например 'Control+k', 'Escape'.
 * @param callback - Функция, которую нужно выполнить.
 */
export function useHotkey(keyCombination: string, callback: Callback): void {
  // Создаем стабильную функцию-обработчик с помощью useCallback
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keys = keyCombination
        .toLowerCase()
        .split("+")
        .map((k) => k.trim());
      const primaryKey = keys.find(
        (k) => !["control", "shift", "alt", "meta"].includes(k)
      );

      // Проверка модификаторов
      const modifiersMatch =
        (!keys.includes("control") || event.ctrlKey) &&
        (!keys.includes("shift") || event.shiftKey) &&
        (!keys.includes("alt") || event.altKey) &&
        (!keys.includes("meta") || event.metaKey); // для Mac

      const isKeyPressed = primaryKey
        ? event.key.toLowerCase() === primaryKey
        : false;

      const target = event.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;

      if (isKeyPressed && modifiersMatch) {
        event.preventDefault();
        callback();
      }
    },
    [keyCombination, callback]
  );

  // 8. useEffect для добавления/удаления слушателя
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Функция очистки: ОЧЕНЬ ВАЖНО для React/Next.js
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
