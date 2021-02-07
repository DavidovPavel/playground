type Unit = "em" | "rem" | "px" | "%";

function parseUnit(value: string): Unit | null {
  const units: Unit[] = ["em", "rem", "px", "%"];
  return units.find((a) => a === value) || null;
}

type Width = {
  unit: Unit;
  value: number;
};

function parseWidth(width: number | string | null | undefined): Width | null {
  // уточнение width до null | undefined
  if (width == null) {
    return null;
  }

  // теперь width это string | number
  if (typeof width === "number") {
    return { unit: "px", value: width };
  }

  // width: string
  const unit = parseUnit(width);
  if (unit) {
    return { unit, value: parseFloat(width) };
  }

  return null;
}
