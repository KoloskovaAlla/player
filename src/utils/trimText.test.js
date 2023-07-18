import { trimText } from './helpers';

const dataForTests = {
  test1: {
    text: 'Aaaa bbbb cccc ddddddd',
    number: 7,
    expectedString: 'Aaaa'
  },
  test2: {
    text: 'Aaaa bbbb cccc ddddddd',
    number: 11,
    expectedString: 'Aaaa bbbb'
  },
  test3: {
    text: 'Aaaa bbbb cccc ddddddd',
    number: 15,
    expectedString: 'Aaaa bbbb cccc'
  }
};

describe('slicedText:', () => {
  it('Unit test 1', () => {
    const { text, number, expectedString } = dataForTests.test1;
    const slicedText = trimText(text, number)
    expect(slicedText).toEqual(expectedString);
  });

  it('Unit test 2', () => {
    const { text, number, expectedString } = dataForTests.test2;
    const slicedText = trimText(text, number)
    expect(slicedText).toEqual(expectedString);
  });

  it('Unit test 3', () => {
    const { text, number, expectedString } = dataForTests.test3;
    const slicedText = trimText(text, number)
    expect(slicedText).toEqual(expectedString);
  });
});