# ghaction-rewrite-base-href

GitHub action to rewrite the base href in an HTML file

## Inputs

### `html_path`

**Optional** Path to the HTML file to be updated.

### `html_glob`

**Optional** Glob matching HTML files to be updated.

### `base_href`

**Required** New base href to be applied. Don't forget that this must include both **leading** and **trailing** slashes to work correctly in browsers.

* Works: `/MyBaseHref/`
* Does not work: `/MyBaseHref`

## Example usage

With `html_path`:

```yaml
uses: SteveSandersonMS/ghaction-rewrite-base-href@v1.1.0
with:
  html_path: 'path/to/index.html'
  base_href: '/MyProjectName/'
```

With `html_glob`:

```yaml
uses: SteveSandersonMS/ghaction-rewrite-base-href@v1.1.0
with:
  html_glob: 'dist/**/*.html'
  base_href: '/MyProjectName/'
```
