from django.shortcuts import render  # 导入 Django 的渲染函数
from django.http import JsonResponse  # 导入 JsonResponse 用于返回 JSON 数据
import numpy as np  # 导入 NumPy 用于数值计算
import matplotlib  # 导入 Matplotlib 库
matplotlib.use('Agg')  # 使用 'Agg' 后端以生成图像文件而不是在屏幕上显示
import matplotlib.pyplot as plt  # 导入 Matplotlib 的绘图模块
import io  # 导入 io 模块以处理内存中的二进制流
import base64  # 导入 base64 模块用于编码图像数据
import sympy as sp  # 导入 Sympy 用于符号数学计算

def plot_function(request):
    func_str = request.GET.get('function', 'sin(x)')  # 从请求中获取函数参数，默认值为 'sin(x)'
    xmin = float(request.GET.get('xmin', -10))  # 获取 x 轴最小值，默认值为 -10
    xmax = float(request.GET.get('xmax', 10))  # 获取 x 轴最大值，默认值为 10
    ymin = float(request.GET.get('ymin', -10))  # 获取 y 轴最小值，默认值为 -10
    ymax = float(request.GET.get('ymax', 10))  # 获取 y 轴最大值，默认值为 10
    colors = request.GET.get('colors', '').split(',')  # 获取颜色参数列表
    print(f"Received functions: {func_str} with x range ({xmin}, {xmax}) and y range ({ymin}, {ymax}) and colors {colors}")  # 打印接收到的函数、范围和颜色参数

    funcs = func_str.split(',')  # 将字符串按逗号分隔为多个函数
    x = np.linspace(xmin, xmax, 10000)  # 生成从 xmin 到 xmax 的 10000 个等间距的点
    fig, ax = plt.subplots(figsize=(10,7),dpi=300)  # 创建一个新的图形和坐标轴

    for i, func in enumerate(funcs):
        try:
            expr = sp.sympify(func.strip())  # 使用 Sympy 解析输入的函数表达式，并去除多余空格
            f = sp.lambdify(sp.Symbol('x'), expr, 'numpy')  # 将符号表达式转换为 NumPy 可执行函数
            y = f(x)  # 计算 y 值
        except Exception as e:  # 捕获任何异常
            return JsonResponse({'error': str(e)}, status=500)  # 返回异常信息，状态码 500

        color = colors[i % len(colors)] if i < len(colors) else 'blue'  # 使用传递的颜色或默认蓝色
        ax.plot(x, y, color=color, label=func.strip())  # 绘制函数曲线并添加标签

    ax.set_xlim(xmin, xmax)  # 设置 x 轴范围
    ax.set_ylim(ymin, ymax)  # 设置 y 轴范围
    ax.axhline(0, color='black', linewidth=1)  # 添加 y=0 的水平轴线
    ax.axvline(0, color='black', linewidth=1)  # 添加 x=0 的垂直轴线
    ax.grid(True, which='both', linestyle='--', color='gray', linewidth=0.5)  # 添加灰色网格线
    ax.legend(loc='upper right')  # 添加图例

    buffer = io.BytesIO()  # 创建一个内存中的二进制流
    plt.savefig(buffer, format='png')  # 将图形保存到二进制流中，格式为 PNG
    plt.close()  # 关闭图形以释放内存
    buffer.seek(0)  # 将流的位置回退到起点
    image_png = buffer.getvalue()  # 获取二进制图像数据
    buffer.close()  # 关闭二进制流
    image_b64 = base64.b64encode(image_png).decode('utf-8')  # 对图像数据进行 base64 编码

    return JsonResponse({'image': image_b64})  # 返回 JSON 数据，其中包含 base64 编码的图像
