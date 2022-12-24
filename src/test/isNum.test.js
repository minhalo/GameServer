import testCase from "../Validators/checkString"

test('Number validation', () => {
    expect(testCase.isNumeric(20)).toBe(true)
    expect(testCase.isNumeric("n")).toBe(false)
    expect(testCase.isNumeric("123")).toBe(true)
    expect(testCase.isNumeric("12345")).toBe(true)
    expect(testCase.isGmail("12345")).toBe(false)
    expect(testCase.isGmail("duongdoican@gmail.com")).toBe(true)
    expect(testCase.isGmail("duongdoican@gmail")).toBe(false)
    expect(testCase.isPassword("duongdoican@gmail.com")).toBe(false)
    expect(testCase.isPassword("Minlvip123!")).toBe(true)
    expect(testCase.isPassword("minlvip123!")).toBe(false)
})