def transform_date(default_date: str) -> str:
    start_string = str(default_date)[:10]
    DD = start_string[8:10]
    MM = start_string[5:7]
    YYYY = start_string[:4]
    result_string = DD+'.'+MM+'.'+YYYY
    return result_string
