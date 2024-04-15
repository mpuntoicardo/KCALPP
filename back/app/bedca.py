import requests

url = 'https://www.bedca.net/bdpub/procquery.php'

def searchFood(food):
    headers = {'Content-Type': 'text/xml', 'Connection': 'close'}

    body = """<?xml version="1.0" encoding="utf-8"?>
<foodquery>
    <type level="1"/>
    <selection>
        <atribute name="f_id"/>
        <atribute name="f_ori_name"/>
        <atribute name="f_eng_name"/>
    </selection>
    <condition>
        <cond1>
            <atribute1 name="f_ori_name"/>
        </cond1>
        <relation type="LIKE"/>
        <cond3>""" + food + """</cond3>
    </condition>
    <condition>
        <cond1>
            <atribute1 name="f_origen"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>BEDCA</cond3>
    </condition>
    <order ordtype="ASC">
        <atribute3 name="f_ori_name"/>
    </order>
</foodquery>"""    
    r = requests.post(url, headers=headers, data=body, verify=False)
    return r.text


def footDetails(foodId):
    headers = {'Content-Type': 'text/xml', 'Connection': 'close'}

    
    body = """<?xml version="1.0" encoding="utf-8"?>
<foodquery>
    <type level="2"/>
    <selection>
        <atribute name="f_id"/>
        <atribute name="f_ori_name"/>
        <atribute name="photo"/>
        <atribute name="edible_portion"/>
        <atribute name="f_origen"/>
        <atribute name="c_id"/>
        <atribute name="c_ori_name"/>
        <atribute name="c_eng_name"/>
        <atribute name="eur_name"/>
        <atribute name="componentgroup_id"/>
        <atribute name="glos_esp"/>
        <atribute name="glos_ing"/>
        <atribute name="cg_descripcion"/>
        <atribute name="best_location"/>
        <atribute name="v_unit"/>
        <atribute name="moex"/>
        <atribute name="stdv"/>
        <atribute name="min"/>
        <atribute name="max"/>
        <atribute name="v_n"/>
        <atribute name="u_id"/>
        <atribute name="u_descripcion"/>
        <atribute name="value_type"/>
        <atribute name="vt_descripcion"/>
        <atribute name="mu_id"/>
        <atribute name="mu_descripcion"/>
        <atribute name="ref_id"/>
        <atribute name="citation"/>
        <atribute name="at_descripcion"/>
        <atribute name="pt_descripcion"/>
    </selection>
    <condition>
        <cond1>
            <atribute1 name="f_id"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>2402</cond3>
    </condition>
    <condition>
        <cond1>
            <atribute1 name="publico"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>1</cond3>
    </condition>
    <order ordtype="ASC">
        <atribute3 name="componentgroup_id"/>
    </order>
</foodquery>

"""

    body = """<?xml version="1.0" encoding="utf-8"?>
<foodquery>
    <type level="2"/>
    <selection>
        <atribute name="f_id"/>
        <atribute name="f_ori_name"/>
        <atribute name="photo"/>
        <atribute name="edible_portion"/>
        <atribute name="f_origen"/>
        <atribute name="c_id"/>
        <atribute name="c_ori_name"/>
        <atribute name="componentgroup_id"/>
        <atribute name="glos_esp"/>
        <atribute name="best_location"/>
        <atribute name="v_unit"/>
        <atribute name="u_id"/>
        <atribute name="u_descripcion"/>
        <atribute name="mu_descripcion"/>
        <atribute name="ref_id"/>
    </selection>
    <condition>
        <cond1>
            <atribute1 name="f_id"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>2402</cond3>
    </condition>
    <condition>
        <cond1>
            <atribute1 name="publico"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>1</cond3>
    </condition>
    <order ordtype="ASC">
        <atribute3 name="componentgroup_id"/>
    </order>
</foodquery>
"""
    
    r = requests.post(url, headers=headers, data=body, verify=False)
    print(r.text)
