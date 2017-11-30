import os
import sys
from win32com import client as wc
import codecs
from settings import *
import pandas as pd
import json
import shutil

class ConvertFunc():
    # 源文件根目录
    default_path = ''
    # 需要转换的所有文件路径
    convert_path = {}
    full_file = []
    word = wc.Dispatch('Word.Application')

    # 传入文件夹路径，和子文件夹名称
    def __init__(self):

        self.default_path = ROOT_PATH
        self.convert_dir_path = CONVERT_DIR_PATH
        self.file_dir = DIR_LIST

        # 创建文件夹
        for item in self.file_dir:
            convert_part_list = []
            # 源文件夹
            original_dir_path = os.path.join(self.default_path, item)
            if not os.path.exists(original_dir_path):
                os.mkdir(original_dir_path)

            # 目标文件夹
            convert_dir_path =  original_dir_path.replace(self.default_path, self.convert_dir_path)
            if not os.path.exists(convert_dir_path):
                os.mkdir(convert_dir_path)
            for root, dirs, files in os.walk(original_dir_path):
                # 迭代遍历子文件夹
                for dir in dirs:
                    convert_child_path = os.path.join(root.replace(self.default_path, self.convert_dir_path), dir)
                    if not os.path.exists(convert_child_path):
                        os.mkdir(convert_child_path)
                # 遍历所有文件
                for file in files:
                    convert_part_list.append(os.path.join(root, file))
                    self.full_file.append(os.path.join(root, file))

            self.convert_path[item] = convert_part_list

            remove_file_list = []
            # 删除目标文件夹中存在，但源文件夹已经删除的部分
            for root_conv, dirs_conv, files_conv in os.walk(os.path.join(self.convert_dir_path, item)):
                for dir in dirs_conv:
                    convert_child_dir_path = os.path.join(root_conv, dir)
                    original_child_dir_path = convert_child_dir_path.replace(self.convert_dir_path, self.default_path)
                    if not os.path.exists(original_child_dir_path) and os.path.exists(root_conv) and os.path.exists(convert_child_dir_path):
                        shutil.rmtree(convert_child_dir_path)
                for file in files_conv:
                    remove_file_list.append(os.path.join(root_conv, file))

            for remove_file in remove_file_list:
                if not os.path.exists(remove_file.replace(self.convert_dir_path, self.default_path)):
                    os.remove(remove_file)

        # 将文件信息存储到json文件里
        with codecs.open(os.path.join(self.convert_dir_path, 'file_list.json'), 'w') as f:
            json.dump(self.convert_path, f, ensure_ascii=False)

    # Word转HTML
    def wordToHtml(self, file):
        try:
            doc = self.word.Documents.Open(file)
            doc.SaveAs(file.replace(self.default_path, self.convert_dir_path) + '.html', 10)
            doc.Close()
        except Exception as e:
            with codecs.open('error.log', 'w+a') as f:
                f.write(e)
            return False
        return True

    # excel转html
    def excelToHtml(self, file):
        data = pd.read_excel(file)
        data.to_html(file.replace(self.default_path, self.convert_dir_path) + '.html', col_space=80, justify='left', border=2)

    def csvToHtml(self, file):
        data = pd.read_csv(file)
        data.to_html(file.replace(self.default_path, self.convert_dir_path) + '.html', col_space=80, justify='left', border=2)

    # 运行程序
    def process(self):
        n = 1
        for item in self.full_file:
            # 区分是word文件还是excel,csv文件
            ext = os.path.splitext(item)[1]
            if ext in ['.doc', '.docx']:
                self.wordToHtml(item)
            elif ext in ['.xls', '.xlsx']:
                self.excelToHtml(item)
            elif ext in ['.csv']:
                self.csvToHtml(item)
            print(str(n) + '/' + str(len(self.convert_path)) + '文件：' + os.path.split(item)[1] + '路径：' + os.path.split(item)[0])
            n += 1

        self.word.Quit()

if __name__ == "__main__":
    convertClass = ConvertFunc()
    convertClass.process()
