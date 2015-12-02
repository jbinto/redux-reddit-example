import testDom from 'testdom';
import chai from 'chai';

// dirty-chai makes the chai syntax linter-friendly
// https://github.com/prodatakey/dirty-chai
import dirtyChai from 'dirty-chai';

// const doc =
testDom('<!doctype html><html><body></body></html>');
chai.use(dirtyChai);
