import os, json, pprint
from collections import OrderedDict

def encode_complex(obj):
    print(' >ec:', obj)
    if isinstance(obj, complex):
        return [obj.real, obj.imag]
    raise TypeError(f'Object of type {obj.__class__.__name__} '
                    f'is not JSON serializable')

json.dumps(2 + 1j, default=encode_complex)
def _make_iterencode(markers, _default, _encoder, _indent, _floatstr,
        _key_separator, _item_separator, _sort_keys, _skipkeys, _one_shot,
        ## HACK: hand-optimized bytecode; turn globals into locals
        ValueError=ValueError,
        dict=dict,
        float=float,
        id=id,
        int=int,
        isinstance=isinstance,
        list=list,
        str=str,
        tuple=tuple,
        _intstr=int.__repr__,
    ):

    if _indent is not None and not isinstance(_indent, str):
        _indent = ' ' * _indent

    max_indented = 2

    def _iterencode_list(lst, _current_indent_level):
        if not lst:
            yield '[]'
            return
        if markers is not None:
            markerid = id(lst)
            if markerid in markers:
                raise ValueError("Circular reference detected")
            markers[markerid] = lst
        buf = '['
        if _indent is not None and _current_indent_level < max_indented:
            _current_indent_level += 1
            newline_indent = '\n' + _indent * _current_indent_level
            separator = _item_separator + newline_indent
            buf += newline_indent
        else:
            newline_indent = None
            separator = _item_separator
        first = True
        for value in lst:
            if first:
                first = False
            else:
                buf = separator
            if isinstance(value, str):
                yield buf + _encoder(value)
            elif value is None:
                yield buf + 'null'
            elif value is True:
                yield buf + 'true'
            elif value is False:
                yield buf + 'false'
            elif isinstance(value, int):
                # Subclasses of int/float may override __repr__, but we still
                # want to encode them as integers/floats in JSON. One example
                # within the standard library is IntEnum.
                yield buf + _intstr(value)
            elif isinstance(value, float):
                # see comment above for int
                yield buf + _floatstr(value)
            else:
                yield buf
                if isinstance(value, (list, tuple)):
                    chunks = _iterencode_list(value, _current_indent_level)
                elif isinstance(value, dict):
                    chunks = _iterencode_dict(value, _current_indent_level)
                else:
                    chunks = _iterencode(value, _current_indent_level)
                yield from chunks
        if newline_indent is not None:
            _current_indent_level -= 1
            yield '\n' + _indent * _current_indent_level
        yield ']'
        if markers is not None:
            del markers[markerid]

    def _iterencode_dict(dct, _current_indent_level):
        if not dct:
            yield '{}'
            return
        if markers is not None:
            markerid = id(dct)
            if markerid in markers:
                raise ValueError("Circular reference detected")
            markers[markerid] = dct
        yield '{'
        if _indent is not None and _current_indent_level < max_indented:
            _current_indent_level += 1
            newline_indent = '\n' + _indent * _current_indent_level
            item_separator = _item_separator + newline_indent
            yield newline_indent
        else:
            newline_indent = None
            item_separator = _item_separator
        first = True
        if _sort_keys:
            items = sorted(dct.items())
        else:
            items = dct.items()
        for key, value in items:
            if isinstance(key, str):
                pass
            # JavaScript is weakly typed for these, so it makes sense to
            # also allow them.  Many encoders seem to do something like this.
            elif isinstance(key, float):
                # see comment for int/float in _make_iterencode
                key = _floatstr(key)
            elif key is True:
                key = 'true'
            elif key is False:
                key = 'false'
            elif key is None:
                key = 'null'
            elif isinstance(key, int):
                # see comment for int/float in _make_iterencode
                key = _intstr(key)
            elif _skipkeys:
                continue
            else:
                raise TypeError(f'keys must be str, int, float, bool or None, '
                                f'not {key.__class__.__name__}')
            if first:
                first = False
            else:
                yield item_separator
            yield _encoder(key)
            yield _key_separator
            if isinstance(value, str):
                yield _encoder(value)
            elif value is None:
                yield 'null'
            elif value is True:
                yield 'true'
            elif value is False:
                yield 'false'
            elif isinstance(value, int):
                # see comment for int/float in _make_iterencode
                yield _intstr(value)
            elif isinstance(value, float):
                # see comment for int/float in _make_iterencode
                yield _floatstr(value)
            else:
                if isinstance(value, (list, tuple)):
                    chunks = _iterencode_list(value, _current_indent_level)
                elif isinstance(value, dict):
                    chunks = _iterencode_dict(value, _current_indent_level)
                else:
                    chunks = _iterencode(value, _current_indent_level)
                yield from chunks
        if newline_indent is not None:
            _current_indent_level -= 1
            yield '\n' + _indent * _current_indent_level
        yield '}'
        if markers is not None:
            del markers[markerid]

    def _iterencode(o, _current_indent_level):
        if isinstance(o, str):
            yield _encoder(o)
        elif o is None:
            yield 'null'
        elif o is True:
            yield 'true'
        elif o is False:
            yield 'false'
        elif isinstance(o, int):
            # see comment for int/float in _make_iterencode
            yield _intstr(o)
        elif isinstance(o, float):
            # see comment for int/float in _make_iterencode
            yield _floatstr(o)
        elif isinstance(o, (list, tuple)):
            yield from _iterencode_list(o, _current_indent_level)
        elif isinstance(o, dict):
            yield from _iterencode_dict(o, _current_indent_level)
        else:
            if markers is not None:
                markerid = id(o)
                if markerid in markers:
                    raise ValueError("Circular reference detected")
                markers[markerid] = o
            o = _default(o)
            yield from _iterencode(o, _current_indent_level)
            if markers is not None:
                del markers[markerid]
    return _iterencode

json.encoder._make_iterencode = _make_iterencode
#============================================================== EOF JSON HACK

print( os.getcwd() )
os.chdir( os.path.dirname(__file__) )

with open('color-presets0.json', 'r') as f:
    data = json.load(f)

print(data['gammasets']['gammaset'][0].keys())


res = OrderedDict()
for gs in data['gammasets']['gammaset']:
    name = gs['id']
    groups = {}
    for group in gs['gammagroup']:
        n = group['id']
        v = [int(i) for i in group['value'].split(',')]
        gray = int(group.get('gray',0))
        boost = int(group.get('boost',0))

        # groups[n] = {'value':v, 'gray':gray, 'boost':boost}
        groups[n] = OrderedDict(value=v, gray=gray, boost=boost)
    
    res[name] = groups

    # pprint.pprint(groups)
    # print(json.dumps(groups))
    # break

print(json.dumps(res, indent=3, separators=(', ', ': ')))

with open('../static/color-presets.json', 'w') as f:
    data = json.dump(res, f, indent=3, separators=(', ', ': '))