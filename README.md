# <p style="text-align:center;"> FunctionPlotter-demo </p>
<p style="text-align:center;"> <img src="./486.1-done.png" width="100" height="100"> </p>

---
## <p style="text-align:center;"> 前言 </p>
虽说后端就当看个乐子，但不得不说用python进行算式符号的解析非常省事，后续可能会保留算式解析部分，用**Brython**来实现python代码在前端的直接运行，或者寻找方便解析算式的js库。

服务器接收函数时可能会返回500状态码，这是因为本地环境变量配置不到位，可在f12调试页面打开前端发送的get请求网址查看错误情况。

---
## <p style="text-align:center;"> 项目运行 </p>
1.前置条件
- [python](https://www.python.org/downloads/windows/)（电脑要安装python，vscode也要安装python插件。安装完请重启设备）

2.安装依赖
```python
python -m venv env 
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
```
- 若提示找不到`requirements.txt`，请检查控制台当前目录是否有效。

3.启动项目
- 
```python
python manage.py runserver
```

<p style="text-align:center;"> <img src="./IMG_4007.PNG" width="300" height="450" title> </p>