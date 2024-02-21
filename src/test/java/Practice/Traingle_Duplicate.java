package Practice;

public class Traingle_Duplicate {
	public static void main(String[] args) {
		String s="Automation Testing";
	    String s1=s.replace(" ", "");
		
		while(s1.length()>0) {
			char ch=s1.charAt(0);
			
			//System.out.println("before :"+ch);
			//System.out.println("count of character:"+ch+":"+countchar(s1,ch));
			int s2=countchar(s1,ch);
			
			//if(countchar(s1,ch)==1) {
			if(s2==1) {
			System.out.println("Not a Duplicate:"+ch);
			}
			else {
				//System.out.print(" Duplicate:"+ch);
			}
			s1=s1.replace(""+ch, "");
		}
	}

	private static int countchar(String s1, char ch) {
		int count=0;
		
		while(s1.indexOf(ch)>-1) {
			
			count++;
			s1=s1.substring(s1.indexOf(ch)+1);
			
		}
		
		return count;
	}

}
