# ChangeLog

Release notes for remark-terms. Latest version is `2.0.0`.

## [2.0.0] - 2019-03-02

This release changes the plugin dramatically. 

- It now defaults to parsing only `{}` and `{{}}` for special terms, but is also configurable. You can specify as many types of terms as you wish and indicate the opening, closing, html element, and a custom html class for each type.
- Nested terms will be parsed. The precedence is the reverse of the options array. You should put your multi-character terms, after your single character terms. 