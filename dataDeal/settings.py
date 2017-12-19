# 获取当前文件路径
import os
current_path = os.path.dirname(os.path.dirname(__file__))
# 文件夹根目录
ROOT_PATH = 'D:/workspace/testFile/'
# 子文件夹
DIR_LIST = ['出入登记', '财务公开', '政务公开', '业务公开']
# 转换到的目标文件
CONVERT_DIR_PATH = os.path.join(current_path, 'frontend/build/html/')
if not os.path.exists(CONVERT_DIR_PATH):
    os.mkdir(CONVERT_DIR_PATH)