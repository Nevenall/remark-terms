# ChangeLog

Release notes for remark-terms. Latest version is `2.1.0`.

## [2.1.0] - 2019-12-08

This release makes some dramatic improvements, especially in the handling of nested terms. 

### Added

- `name` property to `configuration`. It's used as the name for the tokenizer and the MDAST node.
- Many new tests

### Changed

- Parsing of nested terms of the same type now works. Rather then, I believe, escaping term markers as it may have before.
- Parsing where the nested term comes at the end of the string works now.
- Parsing of multiple nested terms works
- Updated to latest unified.js packages

## [2.0.0] - 2019-03-02

This release changes the plugin dramatically. 

- It now defaults to parsing only `{}` and `{{}}` for special terms, but is also configurable. You can specify as many types of terms as you wish and indicate the opening, closing, html element, and a custom html class for each type.
- Nested terms will be parsed. The precedence is the reverse of the options array. You should put your multi-character terms, after your single character terms. 