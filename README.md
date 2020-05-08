# ghaction-rewrite-base-href

GitHub action to rewrite the base href in an HTML file

## Inputs

### `html_path`

**Required** Path to the HTML file to be updated.

### `base_href`

**Required** New base href to be applied. Don't forget that this must include both **leading** and **trailing** slashes to work correctly in browsers.

* Works: `/MyBaseHref/`
* Does not work: `/MyBaseHref`

## Example usage

```yaml
uses: SteveSandersonMS/ghaction-rewrite-base-href@v1
with:
  html_path: 'path/to/index.html'
  base_href: '/MyProjectName/'
```
