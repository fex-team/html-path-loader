html-path-loader
========================
css 模块化工具 

通过为每个 react 组件生成唯一的 className 值来实现 css 组件化

此 loader 需要配合[css-path-loader](https://github.com/fex-team/css-path-loader.git)一起使用才能生效

scss 文件或者 less 文件必须和 react 组件文件必须放置在同一目录下,

如果项目中有通用样式文件, 请在 webpack 配置 entry 文件中使用 require 引入或者在其他文件中使用 `@import` 来引入而不是在某个模块的js文件中使用 `require` 入而不是在 `js` 使用 `require` 

如果样式和组件是`完全分开`放置请不要使用这个 loader,  

## Usage

在项目的 js 文件中, 为每一个react component 的 render 函数返回的 jsx 最外层加上  `_namespace` 参数,
即可自动替换成值为当前文件所在路径的 className 属性. 再配合 css-path-loader 组件, 即可实现每个组件都将拥有属于自身的
className 属性. 

```javascript
    
    module.exports = React.createClass({
        render: function () {
            return (
                <div className="_namespace">
                    helloworld
                </div>
            );
        }
    })
```

## Config

```javascript
    
    module: {
            loaders: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loaders: ['html-path-loader']
                }
            ]
    }
```

## Tips

+ 如何方便设置 _namespace 本身的样式, 直接用`&` 就行了
```css
& {
    // your code 
}

```
