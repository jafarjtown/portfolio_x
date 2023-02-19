

def skills(req):
    s = {
        'languages': ['HTML', 'CSS', 'Javascript', 'Python', 'GoLang'],
        'frameworks': ['Django', 'Flask', 'FastApi','Nextjs', 'Nodejs', 'Express'],
        'years_of_working_experience': 0,
        'mode': 'self-taught',
        
        }
    return s

def about(req):
    s = {
        'name': 'Jafar Idris',
        'nickname': 'Tesla',
        'email': 'jafaridris82@gmail.com',
        'phone_numbers' : [+234_708_033_2077, +234_704_261_2214],
        'nationality': 'Nigerian',
        
        
    }
    return s

def info(req):
    s = {
        'Facebook': {'username': 'Jaafar Idrees', 'link': 'https://facebook.com/jaafar.idrees.7'},
        'Twitter': {'username':'JafarJere Idris', 'link': 'https://twitter.com/jafarjere_idris'},
        'LinkedIn': {'username':'Jafaru Idris', 'link': 'https://linkedin.com/in/jafaru-idris-54a773231'},
        'Github': {'username':'jafarjtown', 'link': 'https://github.com/jafarjtown'}
    }
    
    return s

p = print
def code(req):
    import re, itertools, string
    results = []
    
     
    
    def print(*args, **kwargs):
        for a in args:
            results.append(f'{a}')

    
    if req.method == 'POST':
        try:
            filtered = ''.join(x for x in req.post.data.get('code') if x in string.printable)
            l = req.post.data.get('code').replace(' ', '\t')
            codes = '\n'.join(filtered.split('_'))
            exec(codes)
        except Exception:
            import traceback
            print(traceback.format_exc())    
        
    return results    