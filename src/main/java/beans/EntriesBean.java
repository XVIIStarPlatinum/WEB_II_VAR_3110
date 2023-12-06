package beans;

import java.util.ArrayList;
import java.util.List;
public class EntriesBean {
    public static List<Entry> entries;
    public EntriesBean(){
        this(new ArrayList<>());
    }
    public EntriesBean(List<Entry> entries){
        EntriesBean.entries = entries;
    }
    public static List<Entry> getEntries(){
        return entries;
    }
    public int getSize(){
        return entries.size();
    }
    public void setEntries(List<Entry> entries){
        EntriesBean.entries = entries;
    }
}
