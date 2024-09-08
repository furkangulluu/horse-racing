import { describe, it, expect } from "vitest";
import { deepCopy } from "@/helper/deepCopy"; // Doğru dosya yolunu kullanın

describe("deepCopy", () => {
  it("should deep copy a simple object", () => {
    const obj = { a: 1, b: 2 };
    const copy = deepCopy(obj);

    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
  });

  it("should deep copy an array", () => {
    const arr = [1, 2, 3];
    const copy = deepCopy(arr);

    expect(copy).toEqual(arr);
    expect(copy).not.toBe(arr);
  });

  it("should deep copy a nested object", () => {
    const nestedObj = { a: { b: 1, c: { d: 2 } } };
    const copy = deepCopy(nestedObj);

    expect(copy).toEqual(nestedObj);
    expect(copy).not.toBe(nestedObj);
    expect(copy.a).not.toBe(nestedObj.a); // İç içe nesnelerin referansları farklı olmalı
    expect(copy.a.c).not.toBe(nestedObj.a.c);
  });

  it("should not affect original object when modifying the copy", () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = deepCopy(obj);

    copy.b.c = 3;
    expect(obj.b.c).toBe(2); // Orijinal nesne değişmemeli
  });
});
