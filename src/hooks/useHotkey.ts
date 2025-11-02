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
      // 1. Разбиваем ожидаемое сочетание на части: ["control", "k"]
      const keys = keyCombination.split("+").map((k) => k.trim().toLowerCase());

      // 2. Определяем, какие модификаторы (Ctrl, Shift, Alt) ожидаются
      const hasControl = keys.includes("control");
      const hasShift = keys.includes("shift");
      const hasAlt = keys.includes("alt");

      // 3. Проверяем, нажимаются ли ожидаемые модификаторы
      const isControlPressed = hasControl === event.ctrlKey;
      const isShiftPressed = hasShift === event.shiftKey;
      const isAltPressed = hasAlt === event.altKey;

      // 4. Находим основную клавишу (не модификатор)
      const primaryKey = keys.find(
        (k) => k !== "control" && k !== "shift" && k !== "alt"
      );

      // 5. Проверяем, что основная клавиша нажата
      const isKeyPressed = primaryKey
        ? event.key.toLowerCase() === primaryKey
        : false;

      // 6. Игнорируем, если фокус находится в поле ввода (чтобы не перехватывать текст)
      const target = event.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;

      // 7. Если все совпало (Control/Shift/Alt + Клавиша)
      if (isKeyPressed && isControlPressed && isShiftPressed && isAltPressed) {
        event.preventDefault(); // Останавливаем действие браузера (например, Ctrl+S)
        callback(); // Вызываем вашу функцию (открыть модалку)
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
