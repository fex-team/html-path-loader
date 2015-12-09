html-path-loader
========================
css 模块化工具 

通过为每个 react 组件生成唯一的 className 值来实现 css 组件化

此 loader 需要配合[css-path-loader](https://github.com/andycall/css-path-loader.git)一起使用才能生效

## Usage

在项目的 js 文件中, 为每一个react component 的 render 函数返回的 jsx 最外层加上  `_namespace` 参数,
即可自动替换成值为当前文件所在路径的 className 属性. 再配合 css-path-loader 组件, 即可实现每个组件都将拥有属于自身的
className 属性. 

```javascript
    
    module.exports = React.createClass({
        render: function () {
            return (
                <div _namespace> 
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