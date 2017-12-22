import os
import sys
from win32com import client as wc
import codecs
from settings import *
import pandas as pd
import json
import shutil
import codecs

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
            convert_dir_path = original_dir_path.replace(self.default_path, self.convert_dir_path)
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
                    self.full_file.append(os.path.join(root, file))
                    file_key = os.path.join(root.replace(self.default_path, 'html/'), file + '.html')
                    file_dict = {'key': file_key, 'name': file}
                    convert_part_list.append(file_dict)
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
                judge_file = remove_file.replace(self.convert_dir_path, self.default_path).replace('.html', '')
                if not os.path.exists(judge_file):
                    os.remove(remove_file)



        # 将文件信息存储到json文件里
        with codecs.open(os.path.join(self.convert_dir_path, 'file_list.json'), 'w', encoding='utf-8') as f:
            json.dump(self.convert_path, f, ensure_ascii=False)

    # Word转HTML
    def wordToHtml(self, file):
        os.chdir(os.path.dirname(file))
        file_name = os.path.basename(file)
        try:
            doc = self.word.Documents.Open(file)
            convert_file = file.replace(self.default_path, self.convert_dir_path) + '.html'
            doc.SaveAs(convert_file, 10)
            doc.Close()
            # with codecs.open(convert_file, 'r') as f:
            #     content = f.read()
            # with codecs.open(convert_file, 'w', encoding='utf-8') as f:
            #     f.write(content)
        except Exception as e:
            with codecs.open('error.log', 'w+a') as f:
                f.write(e)
            return False
        return True

    # excel转html
    def excelToHtml(self, file):
        os.chdir(os.path.dirname(file))
        file_name = os.path.basename(file)
        data = pd.read_excel(file_name, encoding='gbk')
        convert_file = file.replace(self.default_path, self.convert_dir_path) + '.html'
        data.to_html(convert_file, col_space=80, justify='left', border=2)
        with codecs.open(convert_file, 'r') as f:
            content = f.read()
        with codecs.open(convert_file, 'w', encoding='utf-8') as f:
            f.write(content)

    def csvToHtml(self, file):
        file_name = os.path.basename(file)
        os.chdir(os.path.dirname(file))
        data = pd.read_csv(file_name)
        convert_file = file.replace(self.default_path, self.convert_dir_path) + '.html'
        data.to_html(convert_file, col_space=80, justify='left', border=2)
        # self.ConvertEncoding(convert_file)

    def ConvertEncoding(self, convert_file):
        with codecs.open(convert_file, 'r') as f:
            content = f.read().encode('gbk').decode('utf-8')
        with codecs.open(convert_file, 'w', encoding='utf-8') as f:
            f.write(content)

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

    # 导出出入登记表
    def exportOutTable(self):
        import pandas as pd
        from datetime import datetime
        from sqlalchemy import create_engine
        engine = create_engine('mysql://root:@localhost:3306/weather_station?charset=utf8', echo=False)
        conn = engine.connect()
        sql = '''
            select * from qxj_out_record
        '''
        df = pd.read_sql(sql, conn)
        del(df['id'])
        del(df['create_date'])
        df = df.rename(columns={'user_name' : '姓名', 'record_date' : '日期', 'out_time' : '出时间', 'back_time' : '归时间', 'car' : '公车', 'remark' : '事由'})
        df.to_excel('F:\气象公开\出入登记\外出登记表.xlsx', index=False)

if __name__ == "__main__":
    convertClass = ConvertFunc()
    convertClass.exportOutTable()
    convertClass.process()
